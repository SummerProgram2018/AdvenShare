//
// Created by Sam Eadie on 4/07/2018.
//
// Utility functions
//

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

/**
 * Converts a file descriptor into two FILE*s, for both input and output
 */
void get_file_stream(int fd, FILE** outStream, FILE** inStream) {
    *outStream = fdopen(fd, "w");
    int fdCopy = dup(fd);
    *inStream = fdopen(fdCopy, "r");
}


/**
 * Reads from FILE until a '\n' and returns the string message. Returns EOF
 */
char* get_next_line(FILE* stream, int exitStatus) {
    char* line = malloc(sizeof(char) * INITIAL_LINE_SIZE);
    char currentLetter = fgetc(stream);
    int len = 0;

    while((currentLetter != '\n')) {
        if(currentLetter == EOF) {
            return EOF;
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