import java.net.Socket;
import java.io.*;

public class ClientWorker implements Runnable {

    private Socket client;
    private String threadName;

    public ClientWorker(Socket client, String name) {
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
            System.out.println("Cannot open in and out streams");
            System.exit(-1);

        }

        while(true) {
            try {
                line = in.readLine();
                out.println(line);
            } catch (IOException e) {
                System.out.println("Read/write failed.");
                System.exit(-1);

            }
        }
    }
}
