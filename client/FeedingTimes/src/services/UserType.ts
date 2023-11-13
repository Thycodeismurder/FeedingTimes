export type User = {
  Father: string | null | undefined;
  Mother: string | null | undefined;
  HeVi: [
    {
      Feeding: {
        quantity: string | null | undefined;
        time: string | null | undefined;
      };
    }
  ];
};
