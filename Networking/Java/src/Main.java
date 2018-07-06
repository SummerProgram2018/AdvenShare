import java.net.UnknownHostException;
import java.util.List;
import java.util.ArrayList;

public class Main {

    private static int NUM_CLIENTS = 5;
    private static int PORT_NUMBER = 2006;

    public static void main(String[] args) {

        //Create server
        Thread serverThread = new Thread () {
            public void run() {
                Server serv = new Server(PORT_NUMBER);
            }
        };

        serverThread.start();

        List<Client> clients = new ArrayList<Client>(NUM_CLIENTS);

        //Create clients
        try {
            for (int i = 0; i < NUM_CLIENTS; i++) {
                clients.add(new Client("127.0.0.1", PORT_NUMBER, String.format("Client %d", i)));
            }
        } catch (UnknownHostException e) {
            System.err.println("Unknown host when creating clients");
            System.exit(-1);
        }

        //Start clients
        clients.forEach(client -> {
            Thread clientThread = new Thread () {
                public void run() {
                    client.connect();
                    client.interact();
                }
            };
            clientThread.start();
        });
    }
}
