interface Props {
  text: string;
}

export const Heading1: React.FC<Props> = ({ text }) => {
  return <h1 className="text-4xl font-bold">{text}</h1>;
};
