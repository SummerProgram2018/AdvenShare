import java.io.BufferedReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.io.*;
import java.net.UnknownHostException;

public class Client {

    private String name;
    private Socket socket;
    private int portNumber;
    private InetAddress ipAddress;

    private PrintWriter socketWriter;
    private BufferedReader socketReader;

    public Client(String ipAddress, int portNumber, String clientName) throws UnknownHostException {
        this.name = clientName;
        this.portNumber = portNumber;
        this.ipAddress = InetAddress.getByName(ipAddress);
    }

    public void connect() {
        try {
            this.socket = new Socket(this.ipAddress, this.portNumber);
            socketWriter = new PrintWriter(this.socket.getOutputStream(), true);
            socketReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        } catch (IOException e) {
            System.err.println(this.name + " was unable to connect to server");
            System.exit(-1);
        }
    }

    public void interact() {
        try {

            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

            String fromUser;
            String fromServer;
            while (true) { //fromServer != null) {
                fromUser = in.readLine();

                if (fromUser != null) {
                    System.out.println(this.name + " to Server: " + fromUser);
                    this.socketWriter.println(fromUser);
                }

                fromServer = this.socketReader.readLine();
                System.out.println("Server to " + this.name + ": " + fromServer);
            }
        } catch (IOException e) {
            System.err.println(this.name + " was unable to read/write to server");
            System.exit(-1);
        }
    }

    protected void finalize(){
        try{
            socket.close();
        } catch (IOException e) {
            System.err.println(this.name + " could not close socket");
            System.exit(-1);
        }
    }
}
