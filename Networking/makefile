CFLAGS= -Wall -pedantic -std=gnu99 -g -lpthread  -I/local/courses/csse2310/include
CLINKFLAGS= -Wall -pedantic -std=gnu99 -g -lpthread -L/local/courses/csse2310/lib -la4

ALLOS= utils.o
ALLCS= utils.c 
ALLHS= utils.h

make: $(ALLOS) $(ALLHS) client.o serverMultiThreaded.o
	touch client.c 
	touch serverMultiThreaded.c
	touch client.c
	gcc $(CLINKFLAGS) $(ALLOS) client.o -o client
	gcc $(CLINKFLAGS) $(ALLOS) serverMultiThreaded.o -o serverMultiThreaded
	
client: $(ALLCS) $(ALLHS)
	gcc $(CFLAGS) client.c -c -o client.o

serverMultiThreaded: $(ALLOS) $(ALLHS)
	gcc $(CFLAGS) serverMultiThreaded.c -c -o serverMultiThreaded.o

utils:
	gcc $(CFLAGS) utils.c -c -o utils.o


