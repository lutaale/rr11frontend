import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./modal.css";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#root");

function ModalApp(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [produto, setProduto] = useState(props.produto);
  const idItem = ` Esse é um id:${props.testId}`;
  function openModal() {
    console.log(idItem);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="ContainerEdit">
      <button id="modalOpen" onClick={openModal}>
        Editar item
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <form action="" id="form-edit-products">
          <input
            type="text"
            placeholder="Nome do produto"
            name="produto"
            id="produto"
            value={produto}
            onChange={(e) => {
              setProduto(e.target.value);
            }}
          />
          <div className="input-categoria">
            <input type="text" name="cor" placeholder="cor" id="cor" />
            <input
              type="text"
              name="categoria"
              placeholder="categoria"
              id="categoria"
            />
          </div>
          <div className="input-number">
            <input type="text" name="modelo" id="modelo" placeholder="modelo" />
            <input
              type="text"
              name="tamanho"
              placeholder="tamanho"
              id="tamanho"
            />
            <input type="text" name="preco" placeholder="preço" id="preco" />
          </div>
          <div>
            <textarea
              name=""
              id="description"
              cols="30"
              rows="10"
              placeholder="Descrição"
            ></textarea>
          </div>

          <button id="submitPut">Atualizar</button>
          <button id="cancelList" onClick={closeModal}>
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ModalApp;
