interface Props {
  text: string;
}

export const Heading2: React.FC<Props> = ({ text }) => {
  return <h1 className="text-2xl font-bold">{text}</h1>;
};
