export function TableOfContents() {
  return (
    <nav className="bg-white min-h-screen p-6 lg:sticky lg:top-14 w-full text-left lg:w-72">
      <h2 className="text-lg font-medium text-gray-900 mb-4">In this article</h2>
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">GPA Scales</h3>
          <ul className="space-y-2.5 text-sm pl-4">
            <li>
              <a href="#a-plus" className="text-gray-600 hover:text-gray-900">
                A+, A (4.0 GPA, 93-100%)
              </a>
            </li>
            <li>
              <a href="#a-minus" className="text-gray-600 hover:text-gray-900">
                A- (3.7 GPA, 90-92%)
              </a>
            </li>
            <li>
              <a href="#b-plus" className="text-gray-600 hover:text-gray-900">
                B+ (3.3 GPA, 87-89%)
              </a>
            </li>
            <li>
              <a href="#b" className="text-gray-600 hover:text-gray-900">
                B (3.0 GPA, 83-86%)
              </a>
            </li>
            <li>
              <a href="#b-minus" className="text-gray-600 hover:text-gray-900">
                B- (2.7 GPA, 80-82%)
              </a>
            </li>
            <li>
              <a href="#c-plus" className="text-gray-600 hover:text-gray-900">
                C+ (2.3 GPA, 77-79%)
              </a>
            </li>
            <li>
              <a href="#c" className="text-gray-600 hover:text-gray-900">
                C (2.0 GPA, 73-76%)
              </a>
            </li>
            <li>
              <a href="#c-minus" className="text-gray-600 hover:text-gray-900">
                C- (1.7 GPA, 70-72%)
              </a>
            </li>
            <li>
              <a href="#d-plus" className="text-gray-600 hover:text-gray-900">
                D+ (1.3 GPA, 67-69%)
              </a>
            </li>
            <li>
              <a href="#d" className="text-gray-600 hover:text-gray-900">
                D (1.0 GPA, 63-66%)
              </a>
            </li>
            <li>
              <a href="#d-minus" className="text-gray-600 hover:text-gray-900">
                D- (0.7 GPA, 60-62%)
              </a>
            </li>
            <li>
              <a href="#f" className="text-gray-600 hover:text-gray-900">
                F (0.0 GPA, 0-59%)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

