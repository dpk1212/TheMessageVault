import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from "./ui/button";

export function PaymentSuccess() {
  const [formData, setFormData] = useState({
    yourName: '',
    recipientName: '',
    recipientContact: '',
    relationship: '',
    situation: '',
    deliveryMethod: 'text',
    additionalInfo: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      deliveryMethod: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form will be submitted to Formspree
    // We just need to show a success state here
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 border-b">
        <div className="container mx-auto px-4 flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <span className="font-medium text-lg tracking-tight">The Message Vault</span>
        </div>
      </header>

      <main className="flex-1 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-2xl">
          {submitted ? (
            <div className="bg-white rounded-xl shadow-xl border p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Information Submitted Successfully!</h1>
              <p className="text-muted-foreground mb-6">Thank you for providing your details. We'll start sending support messages right away.</p>
              <a href="/" className="text-primary hover:underline">Return to Home Page</a>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl border p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Support!</h1>
                <p className="text-muted-foreground">Your payment was successful. Now, let's finalize your support details.</p>
              </div>

              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                action="https://formspree.io/f/myzwnwad"
                method="POST"
              >
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium mb-1">Recipient's Name</label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder="Who will receive the messages"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="deliveryMethod" className="block text-sm font-medium mb-1">Message Delivery Method</label>
                  <div className="flex rounded-lg border overflow-hidden">
                    <div className="flex-1 relative">
                      <input
                        type="radio"
                        id="textDelivery"
                        name="deliveryMethod"
                        value="text"
                        checked={formData.deliveryMethod === 'text'}
                        onChange={handleRadioChange}
                        className="peer absolute opacity-0"
                      />
                      <label
                        htmlFor="textDelivery"
                        className="flex justify-center items-center h-10 w-full cursor-pointer bg-input-background peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:font-medium transition-all"
                      >
                        Text Message
                      </label>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="radio"
                        id="emailDelivery"
                        name="deliveryMethod"
                        value="email"
                        checked={formData.deliveryMethod === 'email'}
                        onChange={handleRadioChange}
                        className="peer absolute opacity-0"
                      />
                      <label
                        htmlFor="emailDelivery"
                        className="flex justify-center items-center h-10 w-full cursor-pointer bg-input-background peer-checked:bg-primary/10 peer-checked:text-primary peer-checked:font-medium transition-all"
                      >
                        Email
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="recipientContact" className="block text-sm font-medium mb-1">
                    {formData.deliveryMethod === 'text' ? "Recipient's Phone Number" : "Recipient's Email"}
                  </label>
                  <input
                    type={formData.deliveryMethod === 'text' ? "tel" : "email"}
                    id="recipientContact"
                    name="recipientContact"
                    value={formData.recipientContact}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder={formData.deliveryMethod === 'text' ? "Phone number" : "Email address"}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium mb-1">Your Relationship to Recipient</label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="friend">Friend</option>
                    <option value="family">Family member</option>
                    <option value="partner">Partner/Spouse</option>
                    <option value="colleague">Colleague</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="situation" className="block text-sm font-medium mb-1">Recipient's Situation</label>
                  <select
                    id="situation"
                    name="situation"
                    value={formData.situation}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    required
                  >
                    <option value="">Select a situation</option>
                    <option value="illness">Illness/medical treatment</option>
                    <option value="grief">Grief/loss</option>
                    <option value="mental">Depression/anxiety</option>
                    <option value="recovery">Recovery</option>
                    <option value="divorce">Divorce/breakup</option>
                    <option value="job-loss">Job loss</option>
                    <option value="caregiving">Caregiving stress</option>
                    <option value="other">Other difficult situation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">Additional Information</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder="Tell us more about the recipient and their situation. This helps us craft more personalized messages."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                >
                  Complete Setup
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  We'll start sending support messages based on the plan you selected. You can manage your subscription at any time.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Message Vault. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/" className="hover:text-primary">Home</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="https://billing.stripe.com/p/login/14kfZ49IJg8letOfYY" className="hover:text-primary">Manage Subscription</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 