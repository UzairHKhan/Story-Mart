import { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";



function OptionButton({ option, type, changePrice, variantName, index }) {
    const [radioValue, setRadioValue] = useState();

    useEffect(() => {
        if (radioValue >= 0) {
            changePrice({
                type,
                price: option[radioValue].price
            })
            variantName(

                option[radioValue].name
                , index
            )
        }
    }, [radioValue])

    return (
        <ButtonGroup>
            {option.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${type}-${idx}`}
                    type="radio"
                    variant={'outline-primary'}
                    name={type}
                    value={radio.idx}
                    checked={radioValue === idx}
                    onChange={() => setRadioValue(idx)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}

export default OptionButton;