const AddonsMenu = (props) => {

    const menuItem = props.menuItems.map(
        (item, index) => {
            return (
                <div className="row checkboxes-row" key={index}>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <label class="checkbox-container">{item}{" (" + props.prices[index] + " Rs./)"}
                                <input type="checkbox" id={item} name="checkboxes" className={"checkboxes " + item + "-checkbox"} onChange={props.addOnSelectHandler}/>
                                <span class="checkmark"></span>
                            </label>

                        </div>

                    </div>
                </div>
            )
        }
    )

    return (
        <div className="container">
            {menuItem}
            
        </div>
        
    )
}

export default AddonsMenu;







{/* <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Cheese </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="cheese" className="checkboxes cheese-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Grilled </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="grilled" className="checkboxes grilled-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Spicy </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="spicy" className="checkboxes spicy-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Packed </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="packed" className="checkboxes packed-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Coke </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="packed" className="checkboxes packed-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Sprite </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="packed" className="checkboxes packed-checkbox"/>
                    </div>
                </div>

                <div className="row checkboxes-row">
                    <div className="col-md-6">
                        <label className="labels">Fanta </label>
                    </div>
                    <div className="col-md-6">
                        <input type="checkbox" id="packed" className="checkboxes packed-checkbox"/>
                    </div>
                </div> */}