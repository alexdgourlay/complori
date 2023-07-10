import ReactModal from "react-modal"

const modalStyles = {
    content: {
        width: '60vw',
        maxWidth: '30rem',
        maxHeight: '50vh',
        margin: 'auto',
        color: 'rgba(255, 255, 255, 0.87)',
        background: '#242424',
        borderRadius: '0.75rem',
        padding: '2rem',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
    }
}

const Modal = ({ children, onClose, ...modalProps }) => (
    <ReactModal
        style={modalStyles}
        ariaHideApp={false}
        {...modalProps}
    >
        <button
            style={{ float: 'right' }}
            onClick={() => onClose?.()}>
            Close
        </button>
        {children}
    </ReactModal>
)


export default Modal