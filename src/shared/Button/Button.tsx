import { Button as AntDesignButton, ButtonProps } from 'antd';
import styles from './Button.module.scss'

type Props = {
    label: string,
    // color?: 'primary' | 'outlined'
    fluid?: boolean,
    letterSpacing?: boolean,
    padded?: boolean,
} & Pick<ButtonProps, 'htmlType' | 'onClick' | 'className' | 'type' | 'ghost'>

/**
 * Custom Button using Ant Design as base
 * @link View Ant Design Button Documentation here: https://ant.design/components/button
 * @param label - Button label
 * @param color - Button background color
 * @param size - Button size *(defaut value is **md**)*
 * @param fluid - If you want the button to be 100% width
 * @param letterSpacing - if you want to have space between letters
 * @param padded - More padding
 */
const CustomButton = ({
    label,
    fluid = false,
    letterSpacing = false,
    padded = false,
    ...rest }: Props) => {
    const classnames = require('classnames')

    const styling = [
        styles.button,
        // styles[color],
        padded && styles.padded,
        fluid && styles.fluid,
        letterSpacing && styles.letterSpacing
    ]

    return <AntDesignButton {...rest} className={classnames(...styling)}>{label}</AntDesignButton>
}

export default CustomButton