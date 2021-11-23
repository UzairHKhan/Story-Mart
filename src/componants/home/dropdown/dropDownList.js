import { useMemo } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedCategory } from "../../redux/state";


function DropDownList() {
    const seletedCategories = useSelector((state) => state.Products.categories)
    const dispatch = useDispatch()

    const show = useMemo(() => {
        return seletedCategories
    },[seletedCategories])

    const selectCatogory = (cat) => {
        dispatch(selectedCategory(cat))
    }

    return (
        <>
            <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                menuVariant="dark"
                title={show}
                className="mt-2 d-grid gap-2"
            >
                <Dropdown.Item
                onClick = {() => selectCatogory('Smart Watch')}
                active = {seletedCategories === 'Smart Watch'}
                >
                    Smart Watch
                </Dropdown.Item>
                <Dropdown.Item
                onClick = {() => selectCatogory('Cosmetics')}
                active = {seletedCategories === 'Cosmetics'}
                >
                    Cosmetics
                </Dropdown.Item>
                <Dropdown.Item
                onClick = {() => selectCatogory('Mobile Accessories')}
                active = {seletedCategories === 'Mobile Accessories'}
                >
                    Mobile Accessories
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                onClick = {() => selectCatogory('All Category')}
                active = {seletedCategories === 'All Category'}
                >
                    All Category
                </Dropdown.Item>
            </DropdownButton>
        </>
    )
}

export default DropDownList;