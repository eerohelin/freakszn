import { WebSocket } from "ws"
import { DraftMode, LobbyPosition } from "./types"

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

    public getSummonerId = async (summonerName:string, tagLine:string) => {
        const summonerInfo = await fetch(`${this.url()}/lol-summoner/v1/alias/lookup?gameName=${summonerName}&tagLine=${tagLine}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accept' : "application/json",
                "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
            }
        })
        const info = await summonerInfo.json()
        if (info["puuid"]) {
            const request1 = await fetch(`${this.url()}/lol-summoner/v2/summoners/puuid/${info["puuid"]}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'accept' : "application/json",
                    "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
                }
            })
            const summonerData = await request1.json()
            if (summonerData["summonerId"]) {
                return summonerData["summonerId"]
            }
        }
        return 0
    }

    public async switchTeam(team:LobbyPosition) {
        const request = await fetch(`${this.url()}/lol-lobby/v1/lobby/custom/switch-teams?team=${team}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept' : "application/json",
                "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
            }
        })
    }

    public async invitePlayers(summonerIds:number[]) {
        const request = await fetch(`${this.url()}/lol-lobby/v2/lobby/invitations`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept' : "application/json",
                "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
            },
            body: JSON.stringify(summonerIds.map((s:number) => {return {"toSummonerId":s}}))
            
        })
    }

    public async createLobby(lobbyName:string, lobbyPass:string, draftMode:DraftMode) {
        const request = await fetch(`${this.url()}/lol-lobby/v2/lobby`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept' : "application/json",
                "Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`
            },
            body: JSON.stringify({
                "isCustom" : true,
                "customGameLobby": 
                {
                    "lobbyName": lobbyName,
                    "lobbyPassword": lobbyPass,
                    "configuration": 
                    {
                        "mapId": 11,
                        "gameMode" : "CLASSIC",
                        "mutators" : 
                        {
                            "id":draftMode
                        },
                        "spectatorPolicy": "AllAllowed",
                        "teamSize": 5
                    }
                }
            })
        })
    }

    public request = async () => {
        
        const socket = new WebSocket(`wss://${this.address}:${this.port}/`, {headers: {"Authorization": `Basic ${Buffer.from(`riot:${this.password}`).toString("base64")}`}})

        socket.on("open", () => {
            
            const temp = "OnJsonApiEvent_lol-lobby_v2_lobby"
            socket.send(JSON.stringify([5, "OnJsonApiEvent_lol-lobby_v1_lobby"]))
        })

        socket.on('message', (e) => {
            const xd = JSON.parse(JSON.stringify(e.toString(),null,2))
            console.log(xd)
        })
    }
}