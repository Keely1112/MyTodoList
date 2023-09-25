import { TodoInputModal } from "../todoPage/types"
import { Button } from "@mantine/core"
import style from "../Button/Button.module.scss"
import styles from "./InputModal.module.scss"

function InputModal({
  todoItem,
  onClose,
  onChange,
  onKeyDown,
}: TodoInputModal) {
  return (
    <div className={styles.inputModalContainer}>
      <input
        className={styles.inputText}
        onChange={(e) => onChange(e, todoItem.id)}
        onKeyDown={(e) => onKeyDown(e, todoItem)}
        type="text"
        defaultValue={todoItem.attributes.title}
      />
      <Button className={style.delButton} onClick={onClose}>
        X
      </Button>
    </div>
  )
}

export default InputModal
