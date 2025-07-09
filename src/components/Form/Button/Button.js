import './Button.style.css';

const Button = ({
    title,
}) => {

    /* ===== RENDER ===== */
    return (
        <button>
            {title}
        </button>
    );
}

export default Button;