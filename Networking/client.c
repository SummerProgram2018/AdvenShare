/*
** CSSE2310/7231 - sample client - code to be commented in class
** Send a request for the top level web page (/) on some webserver and
** print out the response - including HTTP headers.
*/
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <netdb.h>
#include <string.h>

#include "utils.h"

struct in_addr* name_to_IP_addr(char* hostname) {
    int error;
    struct addrinfo* addressInfo;

    error = getaddrinfo(hostname, NULL, NULL, &addressInfo);
    if(error) {
        return NULL;
    }

    // Extract the IP address and return it
    return &(((struct sockaddr_in*)(addressInfo->ai_addr))->sin_addr);
}

int connect_to(struct in_addr* ipAddress, int port) {
    struct sockaddr_in socketAddr;
    int fd;

    // Create socket - TCP socket IPv4
    fd = socket(AF_INET, SOCK_STREAM, 0);
    if(fd < 0) {
        perror("Error creating socket");
        exit(1);
    }

    // Populate server address structure with IP address and port number of
    // the server
    socketAddr.sin_family = AF_INET;	// IPv4
    socketAddr.sin_port = htons(port);	// convert port num to network byte order
    socketAddr.sin_addr.s_addr = ipAddress->s_addr; // IP address - already in
    // network byte order

    // Attempt to connect to the server
    if(connect(fd, (struct sockaddr*)&socketAddr, sizeof(socketAddr)) < 0) {
        perror("Error connecting");
        exit(1);
    }

    // Now have connected socket
    return fd;
}

void send_HTTP_request(int fd, char* file, char* host) {
    char* requestString;

    // Allocate enough space for our HTTP request. HTTP request
    // GET <file> HTTP/1.0\r\n
    // Host: <hostname>\r\n
    // <blank line>
    // (26 is the number of other characters in this request + 1 (null))
    requestString = (char*)malloc(strlen(file) + strlen(host) + 26);

    sprintf(requestString, "GET %s HTTP/1.0\r\nHost: %s\r\n\r\n", file, host);

    // Send request to the server
    if(write(fd, requestString, strlen(requestString)) < 1) {
        perror("Write error");
        exit(1);
    }

    free(requestString);
}

void interact (int fd) {
    char* buffer;
    int numBytesRead;

    FILE* outStream, *inStream;
    get_file_stream(fd, &outStream, &inStream);

    char* welcomeMessage = get_next_line(inStream);
    printf("%s\n", welcomeMessage);
    fflush(stdout);

    while(1) {

        buffer = get_next_line(stdin);

        if(0) { //numBytesRead <=  0) {
            continue;
        } else {
            // Write out to server
            fprintf(outStream, "%s\n", buffer);
            fflush(outStream);

            buffer = get_next_line(inStream);

            fprintf(stdout, "From server: %s\n", buffer);
            fflush(stdout);
        
        }
    }
}

int main(int argc, char* argv[]) {   
    int fd;
    struct in_addr* ipAddress = malloc(sizeof(struct in_addr));
    char* hostname;
    int port;
    char* remainder;

    if(argc != 3) {
        fprintf(stderr, "Usage: %s IPAddress Port\n", argv[0]);
        exit(1);
    }

    hostname = argv[1];
    port = (int)strtol(argv[2], &remainder, 10);

    if(strlen(remainder) || (port < 1024) || (port > 65535)) {
        fprintf(stderr, "Invalid port nunmber\n");
        exit(1);
    }

    if(!inet_aton(hostname, ipAddress)) {
        fprintf(stderr, "Invalid IP address\n");
        exit(1);
    }

    // Establish a connection to port 80 on given IP address
    fd = connect_to(ipAddress, port);
    
    interact(fd);

    // Close socket
    close(fd);
    return 0;
}
