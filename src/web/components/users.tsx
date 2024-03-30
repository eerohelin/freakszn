import t from "@src/shared/config";

interface UsersProps {
  users: []
}

const mockUsers = [
  {
    name: "H0laa",
    profileIconId: 1,
  },
  {
    name: "User1",
    profileIconId: 2,
  },
  {
    name: "User2",
    profileIconId: 3,
  },
  {
    name: "User3",
    profileIconId: 4,
  },
  {
    name: "User4",
    profileIconId: 5,
  },
  {
    name: "User5",
    profileIconId: 6,
  },
  {
    name: "User6",
    profileIconId: 7,
  },
  {
    name: "User7",
    profileIconId: 8,
  },
  {
    name: "User8",
    profileIconId: 9,
  },
  {
    name: "User9",
    profileIconId: 10,
  },
];

export function Users({ users }: UsersProps) {
  return (
    <div className="flex flex-col gap-1">
      {mockUsers.map((u) =>
        <UserCard key={u.name} user={u} />     
      )}
    </div>
  )
}

interface UserCard {
  user: { name: string, profileIconId: string | number }
}

function UserCard({ user }: UserCard) {
  const { data: icon } = t.lol.getSummonerIcon.useQuery({ id: user.profileIconId })
  return (
    <div className="flex gap-2 items-center border-b border-border py-1 px-2">
      <div className="flex items-center">
          <div className="bg-gradient-to-b from-league-border 
          to-league-borderdarker p-[0.125rem] rounded-full">
            <img className="w-10 rounded-full" src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, 
              // @ts-ignore
              icon
            ))}`} alt="avatar" />
          </div>
      </div>
      <div>
        <p className="text-[#9f9a8b]">{user.name}</p>
        <div className="text-[#029f3f] text-sm">Online</div>
      </div>
    </div> 
  )
}