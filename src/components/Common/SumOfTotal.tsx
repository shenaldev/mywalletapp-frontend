import { numberFormat } from "../../util/Util";

function SumOfTotal(props) {
  const sum = props.sum;
  return (
    <div className="flex justify-end mt-8">
      {sum > 0 && (
        <p className={`font-semibold border-b ${props.className ? props.className : undefined}`}>Total = {numberFormat(sum)}</p>
      )}
    </div>
  );
}

export default SumOfTotal;
