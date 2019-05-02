# Webhook Dashboard

Listen for GET requests to port 53512

- Website with Dashboard to display if I am or not in Serene Mode (add other team members at later stage).

- Socket.io communicate with Front-end so see changes in real time without refreshing page.

- Plain HTML (for the moment) and JS so that don't require build steps. Add React at later stage.

- Save state somewhere so that if I refresh my page it will still know if I am in serene mode or not. [json file?]

- Webhook listener will only process the request if the correct x-serene header is given. The hopefully will prevent bad requests doing bad things.

