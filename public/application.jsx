/**
 *
 The form has the following fields:
 - gender (available options: "female", "male")
 - firstname
 - lastname
 - email (email format)
 - phone
 - age (1-99)
 - zip (min 3 , max 5 digits)
 - termsAccepted
 *
 */
class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            gender: '',     // (available options: "female", "male")
            email: '',      // (email format)
            phone: '',
            age: '',        // (1-99)
            zip: '',        // TODO:    (min 3 , max 5 digits)
            termsAccepted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch ( event.target.id ) {
            case 'firstname':
                this.setState({firstname: event.target.value});
                break;
            case 'lastname':
                this.setState({lastname: event.target.value});
                break;
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'phone':
                this.setState({phone: event.target.value});
                break;

            case 'zip':
                this.setState({zip: event.target.value});
                break;
            case 'age':
                this.setState({age: event.target.value});
                break;

            case 'gender':
                this.setState({gender: event.target.value});
                break;
            case 'termsAccepted':
                this.setState({termsAccepted: !!event.target.value});
                break;

            default:

        }
    }

    /**/
    validateForm(event) {

        //  pattern="\d{3,5}"

        const elZip = document.getElementById('zip');
        const vZip = elZip.value;
        console.log(`validity.valid = ${elZip.validity.valid}`);
        console.log(`validity.badInput = ${elZip.validity.badInput}`);
        if (vZip.length < 3 || vZip.length > 5) {
            //elZip.validity.typeMismatch = true; //  TypeError: Cannot assign to read only property 'typeMismatch' of object '#<ValidityState>'
            //elZip.validity.valid = false;

            elZip.checkValidity()

            elZip.setCustomValidity( 'zip (min 3 , max 5 digits)' );
            return false;
        } else {
            elZip.setCustomValidity('');
        }
        return true;
    }
    /**/

    handleSubmit(event) {

        const isValid = this.validateForm();
        console.log(`form.isValid = ${isValid}`);
        if (!isValid) {
            return false;
        }

        //alert('A name was submitted: ' + this.state.firstname);
        console.log(`Form submitted: ${this.state.firstname} ${this.state.lastname}`);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>
                    Zip:
                    <input id="zip" type="number" value={this.state.zip} onChange={this.handleChange} required placeholder="min 3, max 5 digits" />
                </label>

                <label>
                    Firstname:
                    <input id="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} required />
                </label>
                <br/>
                <label>
                    Lastname:
                    <input id="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} required />
                </label>
                <br/>

                <label>
                    Gender:
                    <select id="gender" value={this.state.gender} onChange={this.handleChange} required>
                        <option value="">-- Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </label>
                <br/>
                <label>
                    Age:
                    <input id="age" type="number" min="1" max="99" value={this.state.age} onChange={this.handleChange} required />
                </label>
                <br/>

                <label>
                    Email:
                    <input id="email" type="email" value={this.state.email} onChange={this.handleChange} required />
                </label>
                <br/>
                <label>
                    Phone:
                    <input id="phone" type="text" value={this.state.phone} onChange={this.handleChange} required />
                </label>
                <br/>
                <br/>

                <label>
                    I Accept Terms:
                    <input id="termsAccepted" type="checkbox" onChange={this.handleChange} required />
                </label>
                <br/>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <ApplicationForm />,
    document.getElementById('root')
);

