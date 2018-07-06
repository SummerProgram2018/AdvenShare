import java.net.Socket;
import java.io.*;

public class ServerWorker implements Runnable {

    private Socket client;
    private String threadName;

    public ServerWorker(Socket client, String name) {
        this.client = client;
        this.threadName = name;
    }

    public void run() {
        String line;
        BufferedReader in = null;
        PrintWriter out = null;

        try {
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            out = new PrintWriter(client.getOutputStream(), true);
        } catch (IOException e) {
            System.err.println("Server was unable to open in and out streams");
            System.exit(-1);
        }

        while(true) {
            try {
                line = in.readLine();
                out.println(line);
            } catch (IOException e) {
                System.err.println("Server worker read/write failed.");
                System.exit(-1);
            }
        }
    }
}
