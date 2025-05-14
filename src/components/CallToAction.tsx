import { Button } from "./ui/button";

export function CallToAction() {
  const handleBeginSupport = () => {
    // Scroll to pricing section when the button is clicked
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-400/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="bg-gradient-to-tr from-card to-card/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-5 rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary opacity-5 rounded-full"></div>

          <div className="relative flex flex-col md:flex-row md:items-center">
            <div className="flex-1 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-2xl md:text-4xl mb-4">
                When "I'm here for you" isn't enough
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Start sending heartfelt support messages today.
                Be there for someone in a way that lasts—not
                just in a moment, but day after day.
              </p>

              {/* Scenario snippet */}
              <div className="bg-muted rounded-xl p-4 mb-6 shadow-sm">
                <p className="italic text-sm">
                  "I never know what to say to my friend since
                  her diagnosis. The Message Vault has given me
                  a way to show up for her consistently, with
                  words that actually help."
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  — A common scenario we're designed to help
                  with
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Start in less than 5 minutes",
                  "30-day satisfaction guarantee",
                  "Cancel anytime",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 flex flex-col bg-white p-6 rounded-xl shadow-lg border border-primary/10">
              <h3 className="text-xl mb-2">
                Start Supporting Someone Today
              </h3>
              <p className="text-muted-foreground mb-6">
                Set up in less than 5 minutes.
              </p>

              <div className="grid gap-4 mb-6">
                <div>
                  <label
                    htmlFor="yourName"
                    className="block text-sm mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="yourName"
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="situation"
                    className="block text-sm mb-1"
                  >
                    Who Needs Support?
                  </label>
                  <select
                    id="situation"
                    className="w-full h-10 px-3 rounded-lg border bg-input-background focus:ring-2 focus:ring-primary/20 focus:border-primary/60 outline-none transition-all"
                  >
                    <option value="">Select a situation</option>
                    <option value="illness">
                      Someone facing illness/medical treatment
                    </option>
                    <option value="grief">
                      Someone experiencing grief/loss
                    </option>
                    <option value="mental">
                      Someone with depression/anxiety
                    </option>
                    <option value="recovery">
                      Someone in recovery
                    </option>
                    <option value="other">
                      Other difficult situation
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="deliveryMethod"
                    className="block text-sm mb-1"
                  >
                    Message Delivery Method
                  </label>
                  <div className="flex rounded-lg border overflow-hidden">
                    <div className="flex-1 relative">
                      <input
                        type="radio"
                        id="textDelivery"
                        name="deliveryMethod"
                        value="text"
                        className="peer absolute opacity-0"
                        defaultChecked
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
              </div>

              <Button 
                className="h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mb-4"
                onClick={handleBeginSupport}
              >
                Begin Their Support
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By clicking "Begin Their Support", you agree to
                our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}