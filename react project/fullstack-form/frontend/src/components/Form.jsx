import React, { useState } from "react";
import axios from "axios"; // ✅ FIXED: Import axios

function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        city: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/users", formData);
            alert(res.data.message);
            setFormData({ name: "", email: "", age: "", city: "" }); // Reset form
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error);
            alert("Error submitting form");
        }
    };

    return (
        <div>
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid black" }}>
                <h2>User Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required /><br /><br />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required /><br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
