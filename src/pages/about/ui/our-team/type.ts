export type Member = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

export type TeamData = {
  title: string;
  members: Member[];
  action_button: {
    label: string;
    link: string;
  };
};

export interface ITeamProps {
  data: TeamData;
}
