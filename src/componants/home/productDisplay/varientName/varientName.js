import OptionButton from "../optionButton/optionButton"


function VarientName({ productDisplay, changePrice, variantName }) {
    return (
        productDisplay.varients.map((item, index) => {
            return (
                <div key={index}>
                    <h4>
                        {item.type}
                    </h4>
                    {<OptionButton
                        option={item.option}
                        type={item.type}
                        index = {index}
                        changePrice={changePrice}
                        variantName={variantName}
                    />}
                </div>
            )
        })
    )
}

export default VarientName