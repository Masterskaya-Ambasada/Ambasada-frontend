export type Paragraph = {
  first_sentence: string;
  main_text: string;
};

export type AboutData = {
  title: string;
  paragraphs: Paragraph[];
  action_button: {
    text: string;
    link: string;
  };
};
