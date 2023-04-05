import { BiPlus } from "react-icons/bi";

function CardHeader(props) {
  return (
    <div className="flex mb-6">
      <h3 className="text-lg font-medium text-center flex-grow">{props.title}</h3>
      <div>
        <button
          className="bg-green-600 rounded-full float-right"
          onClick={props.addButtonClick ? props.addButtonClick : undefined}
        >
          <BiPlus color="white" size="1.6rem" />
        </button>
      </div>
    </div>
  );
}

export default CardHeader;
