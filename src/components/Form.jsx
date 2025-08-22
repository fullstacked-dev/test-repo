import React, { useState } from "react"

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    payment: "",
    language: "",
    terms: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }
    })
  }

  console.log(formData)

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            onChange={handleChange}
            value={formData.email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={formData.password}
          />
        </label>

        <label>
          Payment Type:
          <input
            type="radio"
            name="payment"
            value="visa"
            onChange={handleChange}
            checked={formData.payment === "visa"}
          />
          Visa
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="mastercard"
            onChange={handleChange}
            checked={formData.payment === "mastercard"}
          />
          Mastercard
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={handleChange}
            checked={formData.payment === "paypal"}
          />
          Paypal
        </label>
        <fieldset>
          <legend>Language</legend>
          <label>
            <select
              name="language"
              onChange={handleChange}
              value={formData.language}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c++">C++</option>
            </select>
          </label>
        </fieldset>

        <label>
          <input
            type="checkbox"
            name="terms"
            onChange={handleChange}
            checked={formData.terms}
          />
          Agree to terms
        </label>
      </form>
    </div>
  )
}

export default Form
