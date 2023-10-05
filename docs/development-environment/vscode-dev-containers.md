# VSCode Dev Containers Setup

## Attach Dev Container to Host Network

As per [this thread answer](https://community.home-assistant.io/t/developing-in-devcontainer-how-to-access-local-network-of-host/271935/2), add the following key in `devcontainer.json`.

```json
...,
	"runArgs": [
		"--network=host"
	],
...
```