import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PotentialImpact() {
  const impactCases = [
    {
      id: 1,
      title: "Distanced Families Staying Connected",
      description: "Family members who live far away can maintain meaningful connection with elderly relatives or those going through health challenges.",
      imageUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Elderly person looking at smartphone with smile"
    },
    {
      id: 2,
      title: "Parents Supporting College Students",
      description: "Parents can ensure their college students receive encouraging messages during stressful exam periods or when dealing with homesickness.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageAlt: "College student studying with phone nearby"
    },
    {
      id: 3,
      title: "Friends Supporting Recovery",
      description: "Friends can provide consistent encouragement for someone going through addiction recovery, when daily support can make a crucial difference.",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80", 
      imageAlt: "Person looking contemplative while holding phone"
    },
    {
      id: 4,
      title: "Professionals with Limited Time",
      description: "Busy professionals can ensure their loved ones receive thoughtful support even during periods when work demands leave little time for connection.",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Busy professional looking at phone"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>How We Help</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">Who The Message Vault Is For</h2>
          <p className="text-muted-foreground text-lg">
            Here are some of the situations where we believe our service can make a meaningful difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {impactCases.map((impact) => (
            <div 
              key={impact.id}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9 bg-muted">
                <ImageWithFallback
                  src={impact.imageUrl}
                  alt={impact.imageAlt}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{impact.title}</h3>
                <p className="text-muted-foreground">{impact.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            Note: These examples represent potential use cases based on our research into situations where consistent support messages could be valuable.
          </p>
        </div>
      </div>
    </section>
  );
}