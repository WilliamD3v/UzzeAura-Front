interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-full border transition
              ${
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'border-neutral-300 hover:border-black'
              }`}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
