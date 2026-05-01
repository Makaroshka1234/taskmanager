interface headerListP {
  navList: string[];
}

function HeaderList(props: headerListP) {
  const { navList } = props;
  return (
    <nav>
      <ul className="flex gap-3">
        {navList.map((navItem) => (
          <li key={navItem}>
            <p>{navItem}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default HeaderList;
