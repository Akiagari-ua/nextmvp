import { FC, memo } from "react";
interface Props {
  list: (string | null)[];
}
const Header: FC<Props> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {list.map((i) => (
        <div key={i}>{i}</div>
      ))}
    </div>
  );
};

export default memo(Header);
