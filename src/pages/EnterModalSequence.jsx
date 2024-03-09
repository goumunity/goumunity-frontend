import { useState } from 'react';
import Modal from '../components/common/Modal/Modal';
const EnterModalSequence = () => {
  const [val, setVal] = useState('');
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      openModal();
    }
  };

  const handleOnChange = (e) => {
    setVal(e.target.value);
  };

  // ---------------------------Upper KeyPress Down Modal --------------------------

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <input
        onChange={handleOnChange}
        onKeyDown={handleOnKeyPress}
        placeholder='value 입력'
      />
      <Modal showModal={showModal} func={closeModal}>
        {val}
      </Modal>
    </>
  );
};

export default EnterModalSequence;
