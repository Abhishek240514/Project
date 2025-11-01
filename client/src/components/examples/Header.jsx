import Header from "../Header";

export default function HeaderExample() {
  return <Header onCreateTeam={() => console.log("Create team clicked")} />;
}
