type ButtonProps = {
  type?: HTMLButtonElement["type"];
  colors?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

function Button(props: ButtonProps) {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`px-4 py-2 rounded font-medium inline-block disabled:bg-slate-200 disabled:text-black ${
        props.colors ? props.colors : "bg-primaryColor hover:bg-primaryColor/90 text-white"
      } ${props.className ? props.className : undefined}`}
      disabled={props.disabled}
      onClick={props.onClick ? props.onClick : undefined}
    >
      {props.children}
    </button>
  );
}

export default Button;
