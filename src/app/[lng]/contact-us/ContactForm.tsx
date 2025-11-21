// app/contact-us/ContactForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import ImageGallery from '@/components/common/ImageGallery';
import { useTranslation } from '@/app/context/TranslationContext';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    selectInquiry: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // FIXED
  const { dict } = useTranslation();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("EiBwFA5r9ixDAl9cB");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.selectInquiry || !formData.message) {
      setSubmitMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

    try {
      const templateParams = {
        to_email: "info.rw@trinity-metals.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        inquiry_type: formData.selectInquiry,
        message: formData.message,
      };

      const response = await emailjs.send(
        "service_4cdavqh",
        "template_oktjb6o",
        templateParams
      );

      if (response.status === 200) {
        setSubmitMessage("Your message has been sent successfully!");
        setFormData({ name: "", phone: "", email: "", selectInquiry: "", message: "" });
        setTimeout(() => setSubmitMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => setIsVisible(prev => !prev);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-2 bg-white rounded-lg shadow-md">
      {submitMessage && (
        <div className={`alert ${submitMessage.includes("successfully") ? "alert-success" : "alert-danger"}`}>
          {submitMessage}
        </div>
      )}

      <div className="field-wrapper">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="field-wrapper contain-select">
        <input
          type="number"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="selectInquiry"
          value={formData.selectInquiry}
          className="w-full p-2 border rounded-md select-inquiry"
          placeholder={formData.selectInquiry || "YOUR INQUIRY ABOUT"}
          onClick={handleToggle}
          readOnly
        />
        {isVisible && (
          <div ref={dropdownRef} className="display-options visible">
            <label className="field-title">
              YOUR INQUIRY ABOUT
              <span>
                <ImageGallery
                  imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Icon-1.svg"
                  imageName="Dropdown Icon"
                  width={14}
                  height={37}
                  alt={undefined}
                  customClass="Dropdown icon"
                />
              </span>
            </label>
            {["General Inquiry", "Media & Partnership Inquiry"].map((type, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={type}
                  name="selectInquiry"
                  type="radio"
                  id={`inline-radio-${index + 1}`}
                  value={type}
                  checked={formData.selectInquiry === type}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="field-wrapper">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded-md"
          placeholder={dict.Contact["field-wrapper-message-placeholder"]}
        />
      </div>

      <div className="button-wrapper">
        <button type="submit" disabled={isLoading} className="w-full text-white p-2 rounded-md form-submit-button">
          <span className="button-text">
            {isLoading ? "Sending..." : dict.Contact["field-wrapper-sendbtn"]}
          </span>
          <span className="button-icon">
            <ImageGallery
              imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/contact-us-icon.svg"
              imageName="Send Icon"
              width={14}
                  height={13}
                  customClass="Dropdown icon"
                  alt={undefined}

            />
          </span>
        </button>
      </div>
    </form>
  );
}