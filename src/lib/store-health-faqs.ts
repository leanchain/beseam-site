export const STORE_HEALTH_FAQS = [
  {
    question: "What do I need to connect to get started?",
    answer:
      "Start with your domain. Add store, analytics, search, behavior, or customer data only when it helps Beseam understand the problem or make an approved change.",
  },
  {
    question: "How does Beseam decide what to fix first?",
    answer:
      "Beseam looks at what shoppers did, what happened on the store, and what changed in sales. It separates facts from possible explanations and shows what is most worth fixing first, with the reason attached.",
  },
  {
    question: "What can Beseam actually change?",
    answer:
      "With the right access, Beseam can change product data, content, merchandising, onsite search, recommendations, and other editable parts of the store. What it can apply depends on the system you connect and the approval rules you choose.",
  },
  {
    question: "What needs approval before it goes live?",
    answer:
      "You choose the rules. Beseam prepares customer-facing changes and applies them only after the required approval. Changes that need brand judgment stop for review. Where the system supports rollback, Beseam keeps the previous state.",
  },
  {
    question: "How often does Beseam check?",
    answer:
      "It keeps running after the first scan. Beseam re-asks a rotating sample of your shopper questions every day, so an answer that changes is caught when it changes, and a weekly email tells you what moved, what is waiting for your approval, and what to fix next. You do not have to open it every day.",
  },
  {
    question: "How does Beseam measure whether a change helped?",
    answer:
      "Beseam asks the same shopper questions again after the change and shows whether the answers now name your store. The before-and-after stays with the change, and Beseam does not claim the change caused something the data cannot prove.",
  },
] as const;
