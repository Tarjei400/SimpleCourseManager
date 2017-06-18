import { CourseProvider } from "./CourseProvider";
import { UserProvider } from "./UserProvider";
import _ from "lodash";
import md5 from "md5";

describe("JSON server API", () => {
    const UniqueUserHash = md5("UniqueUserHash");
    const UniqueCourseHash = md5("UniqueCourseHash");

    const mockCourse = {
        title: `${UniqueCourseHash}`,
        begin: 0,
        end: 10,
        candidate_limit: 3,
    };

    const mockUsers = [
        {
            first_name: `${UniqueUserHash}`,
            last_name: `${UniqueUserHash}`,
            gender: "m",
        },
        {
            first_name: `${UniqueUserHash}`,
            last_name: `${UniqueUserHash}`,
            gender: "f",
        },
    ];

    const userId = {};

    it("should retrieve single course object", async () => {
        const { id, title } = await CourseProvider.get(1);

        expect(id).toBe(1);
        expect(title).toBeDefined();
    });

    describe("UsersProvider", () => {
        let created = [];

        afterEach(async () => {
            for (const user of created) {
                await UserProvider.remove(user.id);
            }
            created = [];
        });

        it("should create mocked users", async () => {
            for (const user of mockUsers) {
                await UserProvider.create(user);
            }

            const ret = await UserProvider.getAll();

            created = _.merge(created, _.filter(ret, (o) => {
                return o.first_name.indexOf(`${UniqueUserHash}`) !== -1;
            }));

            expect(ret.length).toBeGreaterThan(0);
            expect(created.length).toBe(mockUsers.length);
        });

        it("should create user, and succesfully apply update on a user", async () => {
            const user = _.clone(mockUsers[0]);

            await UserProvider.create(user);
            let ret = await UserProvider.getAll();
            const newUser = _.find(ret, user);

            created.push(newUser);

            user.last_name = "Edited";
            user.gender = "Edited";

            await UserProvider.update(newUser.id, user);

            ret = await UserProvider.get(newUser.id);

            expect(ret.last_name).toBe("Edited");
            expect(user.gender).toBe("Edited");
        });
    });

    describe("User and Course", () => {
        let createdUsers = [];
        let createdCourses = [];

        afterEach(async () => {
            for (const user of createdUsers) {
                await UserProvider.remove(user.id);
            }
            for (const course of createdCourses) {
                await CourseProvider.remove(course.id);
            }
            createdUsers = [];
            createdCourses = [];
        });

        async function createMockCourse() {
            await CourseProvider.create(mockCourse);
            const ret = await CourseProvider.getAll();

            return _.find(ret, mockCourse);
        }

        async function createMockUser() {
            await UserProvider.create(mockUsers[0]);
            const ret = await UserProvider.getAll();

            return _.find(ret, mockUsers[0]);
        }

        it("should create mock course and clean record", async () => {
            const created = await createMockCourse();

            expect(created).toBeDefined();

            await CourseProvider.remove(created.id);
            const ret = await CourseProvider.getAll();

            const removed = _.find(ret, mockCourse);

            expect(removed).not.toBeDefined();
        });

        it("should create mocked course, mocked user, and perform user registration", async () => {
            const createdCourse = await createMockCourse();
            const createdUser = await createMockUser();

            createdUsers.push(createdUser);
            createdCourses.push(createdCourse);

            let courseUsers = await CourseProvider.getCourseUsers(createdCourse.id);

            expect(courseUsers.length).toBe(0);

            await CourseProvider.addCourseUser(createdCourse.id, createdUser.id);

            courseUsers = await CourseProvider.getCourseUsers(createdCourse.id);
            expect(courseUsers.length).toBe(1);

            const expectedId = md5(`courseId:${createdCourse.id} userId${createdUser.id}`);

            expect(courseUsers[0].id).toBe(expectedId);

            await CourseProvider.removeCourseUser(createdCourse.id, createdUser.id);

            courseUsers = await CourseProvider.getCourseUsers(createdCourse.id);
            expect(courseUsers.length).toBe(0);
        });
    });
});
