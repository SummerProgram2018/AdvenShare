//
// Created by Sam Eadie on 4/07/2018.
//

/*
** CSSE2310/CSSE7231 - Sample Server - to be commented in class
** Accept connections on a given port, read text from connection
** turn it into upper case, send it back.
*/
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <ctype.h>
#include <pthread.h>

#include "utils.h"

#define MAXHOSTNAMELEN 128

void* client_thread(void* arg);

int open_listen(int port)
{
    int fd;
    struct sockaddr_in serverAddr;
    int optVal;

    // Create socket - IPv4 TCP socket
    fd = socket(AF_INET, SOCK_STREAM, 0);
    if(fd < 0) {
        perror("Error creating socket");
        exit(1);
    }

    // Allow address (port number) to be reused immediately
    optVal = 1;
    if(setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &optVal, sizeof(int)) < 0) {
        perror("Error setting socket option");
        exit(1);
    }

    // Populate server address structure to indicate the local address(es)
    // that our server is going to listen on
    serverAddr.sin_family = AF_INET; // IPv4
    serverAddr.sin_port = htons(port); // port number - in network byte order
    serverAddr.sin_addr.s_addr = htonl(INADDR_ANY); // any IP address of this host

    // Bind our socket to this address (IP addresses + port number)
    if(bind(fd, (struct sockaddr*)&serverAddr, sizeof(struct sockaddr_in)) < 0) {
        perror("Error binding socket to port");
        exit(1);
    }

    // Indicate our willingness to accept connections. Queue length is SOMAXCONN
    // (128 by default) - max length of queue of connections waiting to be accepted
    if(listen(fd, SOMAXCONN) < 0) {
        perror("Error listening");
        exit(1);
    }

    return fd;
}

char* capitalise(char* buffer, int len)
{
    int i;

    for(i=0; i<len; i++) {
        buffer[i] = (char)toupper((int)buffer[i]);
    }
    return buffer;
}

void process_connections(int fdServer)
{
    int fd;
    struct sockaddr_in fromAddr;
    socklen_t fromAddrSize;
    int error;
    char hostname[MAXHOSTNAMELEN];

    // Repeatedly accept connections and process data from clients (capitalise)
    while(1) {
        fromAddrSize = sizeof(struct sockaddr_in);
        // Block, waiting for a new connection (fromAddr will be populated
        // with address of the client
        fd = accept(fdServer, (struct sockaddr*)&fromAddr,  &fromAddrSize);
        if(fd < 0) {
            perror("Error accepting connection");
            exit(1);
        }

        // Turn our client address into a hostname - print out details to
        // stdout of server
        error = getnameinfo((struct sockaddr*)&fromAddr, fromAddrSize, hostname,
                            MAXHOSTNAMELEN, NULL, 0, 0);
        if(error) {
            fprintf(stderr, "Error getting hostname: %s\n",
                    gai_strerror(error));
        } else {
            printf("Accepted connection from %s (%s), port %d\n",
                   inet_ntoa(fromAddr.sin_addr), hostname,
                   ntohs(fromAddr.sin_port));
        }

        // Send a welcome message back to the client
        write(fd,"Welcome\n", 8);
        // Start a new thread to deal with communication to the client
        int* fdPtr = malloc(sizeof(int));
        *fdPtr = fd;
        pthread_t threadId;
        pthread_create(&threadId, NULL, client_thread, fdPtr);
        pthread_detach(threadId);
    }
}

void* client_thread(void* arg) {
    char buffer[1024];
    ssize_t numBytesRead;

    int fd = *(int *)arg;
    free(arg);

    // Repeatedly read data from client, turn it into uppercase, send it back
    while((numBytesRead = read(fd, buffer, 1024)) > 0) {
        capitalise(buffer, numBytesRead);
        write(fd, buffer, numBytesRead);
    }

    if(numBytesRead < 0) {
        perror("Error reading from socket");
    }
    // Print a message to server's stdout
    printf("Done\n");
    fflush(stdout);
    // Close client socket
    close(fd);

    return NULL;	// could have called pthread_exit(NULL);
}

int main(int argc, char* argv[])
{
    int portnum;
    int fdServer;

    if(argc != 2) {
        fprintf(stderr, "Usage: %s port-num\n", argv[0]);
        exit(1);
    }

    // Check port number is valid
    portnum = atoi(argv[1]);
    if(portnum < 1024 || portnum > 65535) {
        fprintf(stderr,  "Invalid port number: %s\n", argv[1]);
        exit(1);
    }

    fdServer = open_listen(portnum);

    process_connections(fdServer);
    return 0;
}

