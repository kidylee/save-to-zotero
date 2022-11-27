export default function Success() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main
        className="min-h-full bg-cover bg-top sm:bg-top"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <p className="text-base font-semibold text-black text-opacity-50">
            Success!
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Zotero is now connected to your Twitter account.
          </h1>
          <p className="mt-2 text-lg font-medium text-black text-opacity-50">
            Saved tweet will saved to your first Zotero collection.
          </p>
        </div>
      </main>
    </>
  );
}
