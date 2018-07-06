import java.net.*;
import java.util.List;
import java.io.IOException;

public class Server {

    private int portNumber;
    private ServerSocket socket;
    private List<Thread> threads;

    public Server() {
        this(2048);
    }

    public Server(int portNumber) {
        this.portNumber = portNumber;
        listenSocket();
    }

    public void listenSocket(){
        try{
            this.socket = new ServerSocket(this.portNumber);
        } catch (IOException e) {
            System.out.println(String.format("Could not listen on port %d", this.portNumber));
            System.exit(-1);
        }
        while(true){
            ClientWorker w;
            try{
                w = new ClientWorker(socket.accept(), String.format("Thread %d", threads.size()));
                Thread t = new Thread(w);
                threads.add(t);
                t.start();
            } catch (IOException e) {
                System.out.println("Accept failed: 4444");
                System.exit(-1);
            }
        }
    }
}
