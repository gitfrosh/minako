import MyHead from "./../components/MyHead";
import Layout from "./../components/Layout";
import Link from "next/link";

function New() {
  return (
    <div>
      <MyHead />
      <Layout>
        <div>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p>
            <form>
              <fieldset>
                <label for="nameField">Name</label>
                <input type="text" placeholder="CJ Patoilo" id="nameField" />
                <label for="ageRangeField">Age Range</label>
                <select id="ageRangeField">
                  <option value="0-13">0-13</option>
                  <option value="14-17">14-17</option>
                  <option value="18-23">18-23</option>
                  <option value="24+">24+</option>
                </select>
                <label for="commentField">Comment</label>
                <textarea placeholder="Hi CJ …" id="commentField"></textarea>
                <div class="float-right">
                  <input type="checkbox" id="confirmField" />
                  <label class="label-inline" for="confirmField">
                    Send a copy to yourself
                  </label>
                </div>
                <input class="button-primary" type="submit" value="Send" />
              </fieldset>
            </form>{" "}
          </p>
        </div>
      </Layout>
      {/* <style jsx>{`
   
    
    `}</style> */}
    </div>
  );
}
export default New;
