import java.net.*;
import java.util.List;
import java.util.ArrayList;
import java.io.IOException;

public class Server {

    private int portNumber;
    private ServerSocket socket;
    private List<Thread> threads;

    public Server() {
        this(0);
    }

    public Server(int portNumber) {
        this.portNumber = portNumber;
        threads = new ArrayList<Thread>(2);
        listenSocket();
    }

    public void listenSocket(){
        //Listen on socket
        try {
            this.socket = new ServerSocket(this.portNumber);
        } catch (IOException e) {
            System.err.println(String.format("Could not listen on port %d", this.portNumber));
            System.exit(-1);
        }

        //Accept connections and handle on new thread
        while(true) {
            ServerWorker w;
            try {
                Socket newSocket = socket.accept();
                w = new ServerWorker(newSocket, String.format("Thread %d", threads.size()));
                Thread t = new Thread(w);
                threads.add(t);
                t.start();
            } catch (IOException e) {
                System.err.println("Accept failed");
                System.exit(-1);
            }
        }
    }

    protected void finalize(){
        try{
            socket.close();
        } catch (IOException e) {
            System.err.println("Server could not close socket");
            System.exit(-1);
        }
    }
}
