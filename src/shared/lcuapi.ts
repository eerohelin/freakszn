import { WebSocket } from "ws"
import fs from "node:fs"

export class LCUApi {
    private address:string | undefined = undefined
    private port:number | undefined = undefined
    private password:string | undefined = undefined
    private url = () => `https://${this.address}:${this.port}`

    constructor (address:string, port:number, password:string) {
        this.address = address
        this.port = port
        this.password = password
    }

    public request = async () => {
        
        const request = await fetch(`${this.url()}/lol-lobby/v2/lobby`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept' : "application/json",
                "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
            },
            body: JSON.stringify({
                data: {
                    "customGameLobby": {
                        "configuration": {
                            "gameMode": "CLASSIC",
                            "mapId": 11,
                            "mutators": {"id":1},
                            "teamSize": 5
                        },
                        "lobbyName": "test:D",
                        "lobbyPassword": "123"
                    },
                    "isCustom": true
                }
            })
        })
        const data = await request.json()
        console.log(data)

        const socket = new WebSocket(`wss://${this.address}:${this.port}/`, {headers: {"Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`}})

        socket.on("open", () => {
            socket.send(JSON.stringify([5, "OnJsonApiEvent_lol-lobby_v2_lobby"]))
        })

        socket.on('message', (e) => {
            const xd = JSON.parse(JSON.stringify(e.toString(),null,2))
            const isLobbyEvent = xd.toString().includes("lobby")
            console.log(xd)
        })
    }
}