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

struct in_addr* name_to_IP_addr(char* hostname)
{
    int error;
    struct addrinfo* addressInfo;

    error = getaddrinfo(hostname, NULL, NULL, &addressInfo);
    if(error) {
        return NULL;
    }
    // Extract the IP address and return it
    return &(((struct sockaddr_in*)(addressInfo->ai_addr))->sin_addr);
}

int connect_to(struct in_addr* ipAddress, int port)
{
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

void send_HTTP_request(int fd, char* file, char* host)
{
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

void get_and_output_HTTP_response(int fd)
{
    char buffer[1024];
    int numBytesRead;
    int eof = 0;

    // Repeatedly read from network fd until nothing is left (EOF)
    // Print everything out to stdout
    while(!eof) {
        numBytesRead = read(fd, buffer, 1024);
        if(numBytesRead < 0) {
            perror("Read error\n");
            exit(1);
        } else if(numBytesRead == 0) {
            eof = 1;
        } else {
            // Write out bytes to stdout
            fwrite(buffer, sizeof(char), numBytesRead, stdout);
        }
    }
}

int main(int argc, char* argv[]) {
    int fd;
    struct in_addr* ipAddress;
    char* hostname;

    if(argc != 2) {
        fprintf(stderr, "Usage: %s hostname\n", argv[0]);
        exit(1);
    }
    hostname = argv[1];

    // Convert hostname to IP address
    ipAddress = name_to_IP_addr(hostname);
    if(!ipAddress) {
        fprintf(stderr, "%s is not a valid hostname\n", hostname);
        exit(1);
    }

    // Establish a connection to port 80 on given IP address
    fd = connect_to(ipAddress, 80);
    // Send request to server for the top level web page (/)
    send_HTTP_request(fd, "/", hostname);
    // Retrieve the response and print it out
    get_and_output_HTTP_response(fd);
    // Close socket
    close(fd);
    return 0;
}
