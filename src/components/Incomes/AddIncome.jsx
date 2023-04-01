import ModalHeader from "../Common/ModalHeader";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import FormRow from "../UI/Forms/FormRow";
import Input from "../UI/Forms/Input";
import FormGroup from "../UI/Forms/FormGroup";
import Button from "../UI/Button";

function AddIncome(props) {
  //Modal Hide Handler
  const modelHideHandler = () => props.modalHide();

  return (
    <Modal>
      <Card className="min-w-[28rem] max-w-md">
        <ModalHeader title="Add New Income" closeButtonClick={modelHideHandler} />
        <form className="mt-4">
          <FormRow>
            <Input labelName="From" id="from" name="from" placeholder="Salaries" />
          </FormRow>
          <FormGroup>
            <FormRow>
              <Input labelName="Cost" id="cost" name="cost" type="number" placeholder="100.99" />
            </FormRow>
            <FormRow>
              <Input labelName="Date" id="date" name="date" type="date" />
            </FormRow>
          </FormGroup>
          <FormRow>
            <Input labelName="Additional Details (optional)" id="additional" name="additional" />
          </FormRow>
          <FormRow>
            <Button type="submit">Save</Button>
          </FormRow>
        </form>
      </Card>
    </Modal>
  );
}

export default AddIncome;
