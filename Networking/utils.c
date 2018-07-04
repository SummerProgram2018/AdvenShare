//
// Created by Sam Eadie on 4/07/2018.
//

//
// Created by Sam Eadie on 4/07/2018.
//
// A simple client.
//

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

/**
 * Attempts to connect to a port, returns the fd on success. Exits
 * appropriately if unsuccessful
 */
int connect_to(struct in_addr* ipAddress, int port)
{
    struct sockaddr_in socketAddr;
    int fd;

    // Create socket - TCP socket IPv4
    fd = socket(AF_INET, SOCK_STREAM, 0);

    if(fd < 0) {
        //Error checking
        printf("Client Connection Error: Returned invalid fd\r\n".);
    }

    // Populate server address structure with IP address and port number of
    // the server
    socketAddr.sin_family = AF_INET;
    socketAddr.sin_port = htons(port);
    socketAddr.sin_addr.s_addr = ipAddress->s_addr;

    // Attempt to connect to the server
    if(connect(fd, (struct sockaddr*)&socketAddr, sizeof(socketAddr)) < 0) {
        client_exit(3);
    }

    // Now have connected socket
    return fd;
}


/**
 * Initiates a client, including arg checking. Will exit if appopriate.
 */
int client_startup(int argc, char** argv, char* passSymbolMessage) {
    int fd;
    struct in_addr ipAddress;
    char* filename;
    int portNumber;
    char* portRemainder;
    char passSymbol;

    filename = argv[1];
    passSymbol = read_pass_char(filename);

    portNumber = (int)(strtol(argv[2], &portRemainder, 10));

    if(strlen(portRemainder) != 0) {
        //Raise invalid argument error
        client_exit(3);
    }

    // Convert hostname to IP address
    if(inet_aton("127.0.0.1", &ipAddress) == 0) {
        client_exit(3);
    }

    // Establish a connection to specified port on local host
    fd = connect_to(&ipAddress, portNumber);

    // Send passchar to server
    send_pass_char(fd, passSymbolMessage, passSymbol);



    return fd;
}

/**
 * Reads from FILE until a '\n' and returns the string message. Will exit
 * with the specified exitStatus if it receives an EOF
 */
char* get_next_line(FILE* stream, int exitStatus) {
    char* line = malloc(sizeof(char) * INITIAL_LINE_SIZE);
    char currentLetter = fgetc(stream);
    int len = 0;

    while((currentLetter != '\n')) {
        if(currentLetter == EOF) {
            client_exit(exitStatus);
        }
        if(sizeof(line) + 1 >= len * sizeof(char)) {
            line = realloc(line, 2 * sizeof(line));
        }
        line[len++] = currentLetter;
        currentLetter = fgetc(stream);
    }

    line[len++] = '\0';
    return line;
}



/**
 * Handles the starting procedure for a normal player start. Will exit as
 * appropriate during argument checking and connecting.
 */
void handle_normal_start(int argc, char** argv, FILE** inStream,
                         FILE** outStream) {
    char* message = "play";
    char* playerName = argv[3];
    char* gameName = argv[4];

    int fd = client_startup(argc, argv, message);
    get_file_stream(fd, outStream, inStream);

    char* response = get_next_line(*inStream, 7);
    if(strcmp(response, "yes")) {
        //Didnt receive yes
        client_exit(4);
    }

    fprintf(*outStream, "%s\n%s\n", playerName, gameName);
    fflush(*outStream);
    response = get_next_line(*inStream, 7);
    if(strcmp(response, "yes")) {
        //Didnt receive yes
        client_exit(5);
    }
}
