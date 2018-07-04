//
// Created by Sam Eadie on 4/07/2018.
//

#ifndef NETWORKING_UTILS_H
#define NETWORKING_UTILS_H

/**
 * Converts a file descriptor into two FILE*s, for both input and output
 */
void get_file_stream(int fd, FILE** outStream, FILE** inStream);

/**
 * Reads from FILE until a '\n' and returns the string message. Will exit
 * with the specified exitStatus if it receives an EOF
 */
char* get_next_line(FILE* stream, int exitStatus);

#endif //NETWORKING_UTILS_H
