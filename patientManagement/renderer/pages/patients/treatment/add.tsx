import { useRouter } from "next/router";
import Modal from 'react-modal';
import CreateTreatment from "../../../components/form/CreateTreatment";

Modal.setAppElement('#__next')

const AddTreatment = () => {
    const router = useRouter();
    
    return (
        <>
            <Modal
                isOpen={!!router.query.id}
                onRequestClose={() => router.back()}
                contentLabel="Create Treatment"
            >
                <CreateTreatment/>
            </Modal>
        </>
    )
}
export default AddTreatment;