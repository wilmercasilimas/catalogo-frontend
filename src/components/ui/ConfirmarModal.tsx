import {
  modalOverlay,
  modalContainer,
  modalHeader,
  modalBody,
  modalFooter,
  closeButton,
} from "@/styles/modals";

interface Props {
  abierto: boolean;
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ConfirmarModal({
  abierto,
  mensaje,
  onConfirmar,
  onCancelar,
}: Props) {
  if (!abierto) return null;

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        <div className={modalHeader}>
          Confirmar acción
          <button onClick={onCancelar} className={closeButton}>
            ✕
          </button>
        </div>

        <div className={modalBody}>
          <p className="text-sm text-gray-700">{mensaje}</p>
        </div>

        <div className={modalFooter}>
          <button
            onClick={onCancelar}
            className="bg-gray-200 px-4 py-2 rounded mr-2 text-gray-700 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
